require 'date'
require 'yaml'
require 'json'
require 'fileutils'
require 'net/http'

TOKEN = '4a2f9464b2749587b6c26557a59268'.freeze
NOGOCITIES = ['Rockville', 'Silver Spring']
BALTIMORE = {
  'lon' => -76.62000274658203,
  'lat' => 39.290000915527344
}

def distance a, b
  rad_per_deg = Math::PI/180  # PI / 180
  rkm = 6371                  # Earth radius in kilometers
  rm = rkm * 1000             # Radius in meters

  dlon_rad = (b['lon']-a['lon']) * rad_per_deg  # Delta, converted to rad
  dlat_rad = (b['lat']-a['lat']) * rad_per_deg

  lat1_rad = a['lat'] * rad_per_deg
  lon1_rad = a['lon'] * rad_per_deg
  lat2_rad = b['lat'] * rad_per_deg
  lon2_rad = b['lon'] * rad_per_deg

  a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
  c = 2 * Math.asin(Math.sqrt(a))

  (rm * c / 1000).to_i # Delta in meters
end

meetup_folder = '_data/meetups/'
events_folder = '_data/events/'
files = Dir.entries(meetup_folder)
files.reject { |f| File.directory? f }.each do |meetup_file|
  file = "#{meetup_folder}#{meetup_file}"
  data = YAML.load_file file
  url = data['url']
  p url
  usable = url.split(%r{www.meetup.com|\/}).last
  source = URI.parse "https://api.meetup.com/#{usable}/events/?key=#{TOKEN}"
  raw = Net::HTTP.get source
  next if raw == '[]' # no upcoming events

  data = JSON.parse raw
  data.each do |event|
    slug = event['id']
    date = Date.parse event['local_date']
    location = event['venue'] || event['group']
    if location
      next if location['state'] != 'MD' && !location['state'].nil?
      # next if NOGOCITIES.include? location['city']
      if location['lon'] && location['lat']
        dis = distance(BALTIMORE, location)
        if dis > 23
          p "event #{event['id']} has location too far from baltimore: #{dis}km"
          next
        end
      end
    else
      p "event #{event['id']} has no venue or group"
    end
    year = date.year
    month = date.month
    FileUtils.mkdir_p("#{events_folder}#{year}")
    FileUtils.mkdir_p("#{events_folder}#{year}/#{month}")
    outfile_name = "#{events_folder}#{year}/#{month}/#{slug}.yml"
    File.open(outfile_name, 'w') { |outfile| outfile.write(event.to_yaml) }
  end
end

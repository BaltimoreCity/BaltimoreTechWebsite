require 'date'
require 'yaml'
require 'json'
require 'fileutils'
require 'net/http'

TOKEN = '4a2f9464b2749587b6c26557a59268'.freeze
NOGOCITIES = ['Rockville', 'Silver Spring'].freeze
BALTIMORE = {
  'lon' => -76.62000274658203,
  'lat' => 39.290000915527344
}.freeze

RADPERDEG = Math::PI / 180 # PI / 180
EARTHRADIUS = 6371 # Earth radius in kilometers
EARTHRADIUSMETER = EARTHRADIUS * 1000 # Radius in meters

def distance(a, b)
  dlon_rad = (b['lon'] - a['lon']) * RADPERDEG # Delta, converted to rad
  dlat_rad = (b['lat'] - a['lat']) * RADPERDEG

  lat1_rad = a['lat'] * RADPERDEG
  lon1_rad = a['lon'] * RADPERDEG
  lat2_rad = b['lat'] * RADPERDEG
  lon2_rad = b['lon'] * RADPERDEG

  a = Math.sin(dlat_rad / 2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad / 2)**2
  c = 2 * Math.asin(Math.sqrt(a))

  (EARTHRADIUSMETER * c / 1000).to_i # Delta in meters
end

MEETIPFOLDER = '_data/meetups/'.freeze
EVENTSFOLDER = '_data/events/'.freeze

def process_event(event)
  slug = event['id']
  location = event['venue'] || event['group']
  if location
    return if location['state'] != 'MD' && !location['state'].nil?

    # next if NOGOCITIES.include? location['city']
    if location['lon'] && location['lat']
      dis = distance(BALTIMORE, location)
      if dis > 23
        p "event #{event['id']} has location too far from baltimore: #{dis}km"
        return
      end
    end
  else
    p "event #{event['id']} has no venue or group"
  end
  date = Date.parse event['local_date']
  year = date.year
  month = date.month
  FileUtils.mkdir_p("#{EVENTSFOLDER}#{year}")
  FileUtils.mkdir_p("#{EVENTSFOLDER}#{year}/#{month}")
  outfile_name = "#{EVENTSFOLDER}#{year}/#{month}/#{slug}.yml"
  File.open(outfile_name, 'w') { |outfile| outfile.write(event.to_yaml) }
end

files = Dir.entries(MEETIPFOLDER)
files.reject { |f| File.directory? f }.each do |meetup_file|
  file = "#{MEETIPFOLDER}#{meetup_file}"
  data = YAML.load_file file
  url = data['url']
  p url
  usable = url.split(%r{www.meetup.com|\/}).last
  source = URI.parse "https://api.meetup.com/#{usable}/events/?key=#{TOKEN}"
  raw = Net::HTTP.get source
  sleep 1
  next if raw == '[]' # no upcoming events

  data = JSON.parse raw

  data.each do |event|
    process_event event
  end
end

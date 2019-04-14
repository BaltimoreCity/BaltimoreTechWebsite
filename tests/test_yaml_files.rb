require 'yaml'

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

def check_yaml_file(file)
  if File.directory? file
    check_yaml_files file
  else
    begin
      item = YAML.load_file file
      location = item['venue'] || item['group'] # events
      if location and location['lon'].to_i > 0
        dis = distance BALTIMORE, location
        if dis > 23
          abort "#{file} has location too far from baltimore: #{dis}km"
        end
      end
    rescue StandardError
      abort("ABORTED! #{file} is not formatted correctly")
    end
  end
end

def check_yaml_files(folder)
  files = Dir.entries folder
  Dir.glob(File.join(folder, '**', '*.yml')) do |file|
    check_yaml_file(file) unless file.match?(/^\.\.?$/)
  end
end

data_folder = '_data'
check_yaml_files data_folder

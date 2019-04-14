require 'date'
require 'yaml'
require 'json'
require 'fileutils'
require 'net/http'

TOKEN = '4a2f9464b2749587b6c26557a59268'.freeze

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
    year = date.year
    month = date.month
    FileUtils.mkdir_p("#{events_folder}#{year}")
    FileUtils.mkdir_p("#{events_folder}#{year}/#{month}")
    outfile_name = "#{events_folder}#{year}/#{month}/#{slug}.yml"
    File.open(outfile_name, 'w') { |outfile| outfile.write(event.to_yaml) }
  end
end

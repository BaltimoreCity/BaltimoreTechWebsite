require 'yaml'

def check_yaml_file(file)
  if File.directory? file
    check_yaml_files file
  else
    begin
      YAML.parse_file file
    rescue StandardError
      abort("ABORTED! #{file} is not formatted correctly")
    end
  end
end

def check_yaml_files(folder)
  files = Dir.entries folder
  files.each do |file|
    check_yaml_file "#{folder}/#{file}" unless file.match?(/^\.\.?$/)
  end
end

data_folder = '_data'
check_yaml_files data_folder

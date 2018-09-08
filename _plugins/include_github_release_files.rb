require 'json'
require 'open-uri'
require 'uri'
require 'fileutils'
require 'pp'
require 'rubygems/package'
require 'zlib'

module Include_Github_Release_Files

  Jekyll::Hooks.register :site, :post_write do |site|
    # code to call after Jekyll renders the site
    puts site
    puts "Running Include Github Release Files plugin..."
    config = site.config['include_github_release_files']
    if !config
      puts "No config for plugin: 'include_github_release_files'"
      config = []
    end

    if !config.kind_of?(Array)
      config = [config]
    end
    config.each do |d|
      api_url = "https://api.github.com/repos/#{d['repo']}/releases/latest"
      puts "Getting github release data from: #{api_url}"
      api_data = JSON.parse(open(api_url).read)
      file_url = api_data['assets'].select {|asset_data| asset_data['name'] == d['filename']}.map {|d| d['browser_download_url']}.first
      
      target_dir = File.join(site.dest,d['target_dir'])
      unless File.directory?(target_dir)
        puts "Target directory was missing...making it"
        FileUtils.mkdir_p(target_dir)
      end
      puts "Archive will be unpacked to: #{target_dir}"
      file_name = File.basename(file_url)
      target_file = File.join(target_dir,file_name)

      begin
        puts "Fetching #{file_url} into #{target_file}"
        File.write(target_file, open(file_url).read)
      rescue StandardError => e
          puts "in rescue!!"
          puts e.message
          puts e.backtrace.inspect
        next
      end

      tar_extract = Gem::Package::TarReader.new(Zlib::GzipReader.open(target_file))
      tar_extract.rewind # The extract has to be rewinded after every iteration
      tar_extract.each do |entry|

        extract_location = File.join(target_dir,entry.full_name)
        
        if entry.directory?
          puts "Creating directory: #{extract_location}"
          FileUtils.mkdir_p(extract_location) unless File.directory?(extract_location)
        end

        if entry.file?
          puts "Writing File:       #{extract_location}"
          File.write(extract_location, entry.read)
        end
      end
      tar_extract.close
    end
  end
end
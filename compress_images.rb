#!/usr/bin/env ruby -w

require 'fileutils'

config = {
    "assets/images" =>
    {
        "source" => "originals",
        "targets" => {
            "desktop" => {
                "-resize" => "3000x",
                "-quality" => "50"
            },
            "mobile" => {
                "-resize" => "1000x",
                "-quality" => "50"
            }
        }
    },
    "assets/headshots" =>
    {
        "source" => "originals",
        "targets" => {
            "compressed" => {
                "-resize" => "600x",
                "-quality" => "50"
            }
        }
    },
    "assets/images/londonliving" =>
    {
        "source" => "originals",
        "targets" => {
            "compressed" => {
                "-resize" => "600x",
                "-quality" => "50"
            }
        }
    }
}

filename = "*.jpg"

config.each do |source,source_config|
    basedir = File.join(source,source_config['source'])
    original_images = Dir.glob(File.join(basedir, filename))

    source_config['targets'].each do |target_name,target_config|

        puts "Optimising images in #{basedir} for #{target_name}"

        target_directory = File.join(source,target_name)

        FileUtils.mkdir_p(target_directory) unless File.directory?(target_directory)

        options = target_config.map {|key,value| "#{key} #{value}"}.join(" ")

        original_images.each do |original_image_path|

            file_name = File.basename(original_image_path)
            target_file = File.join(target_directory,file_name)

            skip = false

            if File.exist?(target_file)
                compressed_file_mtime = File.mtime(target_file)
                original_file_mtime = File.mtime(original_image_path)

                if original_file_mtime < compressed_file_mtime
                    skip = true
                    puts "Original image is older - skipping"
                else
                    puts "Original is newer than compressed - re-compressing"
                end
            end

            unless skip
                command = "convert #{original_image_path} #{options} #{target_file}"
                puts command
                `#{command}`
            end

        end
    end
end

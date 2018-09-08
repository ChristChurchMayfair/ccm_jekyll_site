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
    }
}

filename = "*.jpg"

config.each do |source,source_config|
    basedir = File.join(source,source_config['source'])
    original_images = Dir.glob(File.join(basedir, filename))

    source_config['targets'].each do |target_name,target_config|

        puts "Optimising images for #{target_name}"

        target_directory = File.join(source,target_name)

        FileUtils.mkdir_p(target_directory) unless File.directory?(target_directory)

        options = target_config.map {|key,value| "#{key} #{value}"}.join(" ")

        original_images.each do |original_image_path|

            file_name = File.basename(original_image_path)
            target_file = File.join(target_directory,file_name)

            command = "convert #{original_image_path} #{options} #{target_file}"
            puts command
            `#{command}`

        end
    end
end
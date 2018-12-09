source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 3.8.0"

gem 'html-proofer'

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-sitemap'
  gem 'jekyll-last-modified-at'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

if File.directory?("../ccm_jekyll_theme")
  puts "Using local version of the theme"
  gem 'ccm-2018', :path => '../ccm_jekyll_theme'
else
  puts "Using github version of jekyll theme"
  gem 'ccm-2018', :git => 'https://github.com/tomduckering/ccm_jekyll_theme.git', :branch => 'attempt_ie11_fix'
end


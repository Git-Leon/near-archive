source "http://rubygems.org"

gem "jekyll", "~> 3.8.5"
gem "github-pages", "202", group: :jekyll_plugins # To upgrade GitHub Pages, run `bundle update github-pages`.


# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.11"
end

# bundle the tzinfo-data gem and associated library for Windows and JRuby
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
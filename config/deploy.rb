set :application, "website"
set :repository,  "git://github.com/hhba/website.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "hhba.info"                          # Your HTTP server, Apache/etc
role :app, "hhba.info"                          # Your HTTP server, Apache/etc
set :user, "www-data"
set :deploy_to, "/var/www/website"
set :use_sudo, false

after :deploy, :assets

task :assets, :roles => [:app] do
  # run "compass compile --css-dir=elecciones/css --sass-dir=sass"
end

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end

@echo off
setlocal
cd /d %~dp0

git init
if errorlevel 1 goto fail

git add .
if errorlevel 1 goto fail

git commit -m "Initial commit - Wisdom School"
if errorlevel 1 goto fail

git branch -M main
if errorlevel 1 goto fail

git remote add origin git@github.com:Jafari786303/wisdom-school.git
if errorlevel 1 goto fail

git push -u origin main
if errorlevel 1 goto fail

echo Done.
exit /b 0

:fail
echo Failed. Check errors above.
exit /b 1

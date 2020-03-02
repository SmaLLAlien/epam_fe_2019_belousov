# H32

**Main changes are in core/, shared/, courses/. Backup db.json data, you can find in  db_backup.json**


1. Clone this repositorie to your disk
```
git clone https://github.com/SmaLLAlien/epam_fe_2019_belousov.git -b HW32-Angular --single-branch
```
2. Go inside project folder
```
cd epam_fe_2019_belousov
```
3. Initialize
```
npm install
```
4. Run json-server with delay to see loader
```
json-server --watch --delay=1000 db.json
```
5. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

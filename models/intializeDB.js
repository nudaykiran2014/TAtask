
const csv = require('csv-parser');
const fs = require('fs');
const JobProfile = require('./jobProfiles');
const User = require('./dataofusers');

fs.createReadStream('./files/ExportCSV_JOB_PROFILE.csv')
    .pipe(csv())
    .on('data', async (row) => {
        try {
            var jobprofile = new JobProfile(row)
            await jobprofile.save()
        }
        catch (err) {
            console.log(err)
        };

        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed and inserted into DB');
    });

fs.createReadStream('./files/ExportCSV_USER_DATA.csv')
    .pipe(csv())
    .on('data', async (row) => {
        try {
            var userdetails = new User({
                "Serial_No": row['Sl No.'],
                "Email Address": row['Email Address'],
                "First_Name": row['FirstName LastName'].split(" ")[0],
                "Last_Name": row['FirstName LastName'].split(" ")[1],
                "DOB": row['Date of Birth'],
                "Address": row['Address'],
                "Activity_Log": row['Activity Log']
            })
            await userdetails.save()
        }
        catch (err) {
            console.log(err)
        };
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed and inserted into DB');
    });

































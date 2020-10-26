const mongoose = require("mongoose")
const users = require('../models/dataofusers');
const jobProfiles = require("../models/jobProfiles");

module.exports.getUserDetails = async (req, res, next) => {
  try {
    var limit = parseInt(req.query.limit);
    var userdetails = await users.aggregate([
      {
        $lookup:
        {
          from: "jobprofiles",
          localField: "Email Address",
          foreignField: "Email Address",
          as: "jobprofile"
        }
      },
      {
        $unwind: "$jobprofile"
      },
      {
        $project: {
          _id: 0,
          First_Name: 1,
          Last_Name: 1,
          jobprofile: "$jobprofile.Job Title",
          "Email Address": 1,
          age: {
            $toInt: {
              $divide: [{ $subtract: [new Date(), "$DOB"] },
              (365 * 24 * 60 * 60 * 1000)]
            }
          }

        }
      }, { $limit: limit }
    ])

    res.send(userdetails)
    /******Sample output
    [
    {
        "Email Address": "Josh_Mcleod3677@deavo.com",
        "First_Name": "Josh",
        "Last_Name": "Mcleod",
        "jobprofile": "Operator",
        "age": 30
    },
    {
        "Email Address": "Carl_Flack254@twace.org",
        "First_Name": "Carl",
        "Last_Name": "Flack",
        "jobprofile": "Lecturer",
        "age": 35
    }
    ] */

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getNumberofUsers = async (req, res, next) => {
  try {
    var userdetails = await jobProfiles.aggregate([
      {
        $match: {}
      },
      {
        $group: { _id: "$Job Title", count: { $sum: 1 } }
      },
      {
        $project: {
          _id: 0,
          job_title: "$_id",
          count: 1
        }
      }
    ])
    res.send(userdetails)
    /******Sample output
    [
    {
        "count": 183,
        "job_title": "Accountant"
    },
    {
        "count": 176,
        "job_title": "Budget Analyst"
    }]
    */

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

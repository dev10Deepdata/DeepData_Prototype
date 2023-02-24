const express = require('express');
const axios = require('axios');
const { findAll } = require('../models/check');
const Check = require('../models/check');
const Visit = require('../models/visit');
const router = express.Router();
const convert = require('xml-js');

router.post('/join', async (req, res, next) => {
  // POST /data/join
  try {
    const visit = await Visit.create({
      age: req.body.age,
      gender: req.body.gender,
    });
    res.status(200).json(visit);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/loadwk/:region', async (req, res, next) => {
  // POST /data/join
  try {

    // &startPage=1&display=10&region=44000
    const request = await axios.get(
      `${process.env.WORKNET_API}&startPage=1&display=100&region=${req.params.region}`
    );

    const wkData = convert.xml2json(request.data, {
      compact: true,
      spaces: 2,
    });
    const data = JSON.parse(wkData);

    let total = parseInt(data.smallGiantsList.total._text);
    if (total <= 100) {
      res.status(200).json(data.smallGiantsList.smallGiant);
    } else {
      let page;
      if (Math.floor(total % 100) > 0) {
        page = Math.floor(total / 100) + 1;
      } else {
        page = Math.floor(total / 100);
      }
      const fullData = [];
      for (let i = 0; i < page; i++) {
        let wkPageData = await axios.get(
          `${process.env.WORKNET_API}&startPage=${i + 1}&display=100&region=${
            req.params.region
          }`
        );
        let PageData = convert.xml2json(wkPageData.data, {
          compact: true,
          spaces: 2,
        });
        let data = JSON.parse(PageData);
        data.smallGiantsList.smallGiant.map((v) => fullData.push(v));
      }
      res.status(200).json(fullData);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/savedata', async (req, res, next) => {
  // POST /data/savedata
  try {
    const check = await Check.create({
      do: req.body.do,
      si: req.body.si,
      company: req.body.name,
      address: req.body.address,
      product: req.body.product,
    });
    await check.addLiked(req.body.meId);
    res.status(200).json(check);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/topthree', async (req, res, next) => {
  // Get /data/topthree
  try {
    const post = await Check.findAll({
      where: {},
      include: [
        {
          model: Visit,
          where: { age: req.age, gender: req.gender },
        },
      ],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;

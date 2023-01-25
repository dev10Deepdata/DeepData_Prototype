const express = require('express');
const { findAll } = require('../models/check');
const Check = require('../models/check');
const Visit = require('../models/visit');
const router = express.Router();

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
    console.log('server: ', check);
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

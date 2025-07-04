const bridge = require('../services/calculatorBridge');
const Calculation = require('../models/Calculation');

exports.calculate = async (req, res) => {
  const { a, b, op } = req.body;
  try {
    const isExist = await Calculation.findOne({a:a,b:b,op:op});
    if(isExist) {
      return res.status(200).json(isExist);
    }
    const javaRes = await bridge.calculate({ a, b, op });
    const doc = await Calculation.create({ a, b, op, result: javaRes.result });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
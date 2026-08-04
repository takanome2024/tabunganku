import * as periodService from "../services/period.service.js";



export const getAll = async (
  req,
  res,
  next
) => {

  try {

    const periods =
      await periodService.getAll();


    res.json({

      success: true,

      data: periods,

    });


  } catch (err) {

    next(err);

  }

};







export const create = async (
  req,
  res,
  next
) => {

  try {


    console.log(
      "========== CREATE PERIOD =========="
    );

    console.log(
      "BODY:",
      req.body
    );



    const payload = {

      periodCode:
        req.body.periodCode ||
        req.body.period_code ||
        req.body.code,


      label:
        req.body.label ||
        req.body.name,


      status:
        req.body.status ||
        "DRAFT",

    };



    console.log(
      "PAYLOAD:",
      payload
    );



    const result =
      await periodService.create(
        payload
      );



    res.status(201).json({

      success: true,

      data: result,

    });



  } catch (err) {


    console.log(
      "CREATE PERIOD ERROR:",
      err.message
    );


    next(err);


  }

};









export const update = async (
  req,
  res,
  next
) => {

  try {


    const payload = {

      periodCode:
        req.body.periodCode ||
        req.body.period_code ||
        req.body.code,


      label:
        req.body.label ||
        req.body.name,


      status:
        req.body.status,

    };



    const result =
      await periodService.update(

        req.params.id,

        payload

      );



    res.json({

      success: true,

      data: result,

    });



  } catch (err) {


    next(err);


  }

};









export const remove = async (
  req,
  res,
  next
) => {

  try {


    await periodService.remove(
      req.params.id
    );



    res.json({

      success: true,

      message:
        "Period berhasil dihapus",

    });



  } catch (err) {


    next(err);


  }

};
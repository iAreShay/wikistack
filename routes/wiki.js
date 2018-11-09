const router = require('express').Router()
const layout = require('../views/layout')
const { Page } = require("../models");
const { addPage } = require("../views");


router.get('/', (req, res) => {
    res.send(layout())
})

// router.post('/', (req, res) => {
//     res.json(req.body)
// })

router.get('/add', (req, res) => {
    res.send(addPage())
})


router.post('/', async (req, res, next) => {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`

    const page = new Page({
        title: req.body.title,
        content: req.body.content
    });
    console.log(page)

    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise.
    try {
        await page.save();
        res.redirect('/');
    } catch (error) { next(error) }
});

module.exports = router

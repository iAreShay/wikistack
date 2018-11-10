/* eslint-disable quotes */
const router = require('express').Router()
const main = require('../views/main')
const { Page } = require("../models");
const { addPage } = require("../views");
const wikiPageRouter = require('../views/wikipage')

router.get('/', async (req, res, next) => {
    try {
        let pageArray = await Page.findAll()
        res.send(main(pageArray))
    } catch (error){ next(error)}
})


router.post('/', async (req, res, next) => {
    try {
        const page = new Page({
            title: req.body.title,
            content: req.body.content
        });
        console.log(page)

    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise.
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) { next(error) }
});


router.get('/add', (req, res) => {
    res.send(addPage())
})


router.get('/:slug', async (req, res, next) => {
    //res.send(`hit dynamic route at ${req.params.slug}`);
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        res.send(wikiPageRouter(page))
    } catch (error) {next(error)}
  });

module.exports = router

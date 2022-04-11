const serieService = require('../services/series.service')
const boom = require('@hapi/boom')
const serieModel = require('../models/series.models')
const service = new serieService()
const express = require('express')
const seriesRoutes = express.Router()

seriesRoutes.post('/serie', async (req, res, next) => {
  try {
    const serie = serieModel(req.body)
    const data = await service.createSeries(serie)
    res.status(201).json({ data })
  } catch (error) {
    next(error)
  }
})

seriesRoutes.get('/', async (req, res, next) => {
  try {
    const data = await service.find()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

seriesRoutes.get('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params
    const data = await service.showSeries(serieId)
    res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
})

seriesRoutes.get('/actors/:actorName', async (req, res, next) => {
  try {
    const { actorName } = req.params
    const data = await service.showActorName(actorName)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

seriesRoutes.get('/series/:premier_date', async (req, res, next) => {
  try {
    const { premier_date } = req.params
    const data = await service.showSerieByDate(premier_date)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

seriesRoutes.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params
    const { serie, number_seasons, original_lenguage, features_seasons } =
      req.body
    const data = await service.editSeries(
      serieId, serie, number_seasons, original_lenguage, features_seasons)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

seriesRoutes.delete('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params
    const data = await service.removeSeries(serieId)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = seriesRoutes

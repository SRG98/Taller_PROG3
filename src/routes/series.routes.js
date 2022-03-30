const serieService = require('../services/series.service')
const serieModel = require('../models/series.models')
const service = new serieService()
const express = require('express')
const seriesRoutes = express.Router()

seriesRoutes.post('/', async (req, res) => {
  try {
    const serie = serieModel(req.body)
    const data = await service.createSeries(serie)
    res.status(201).json({data})
  } catch (error) {
    res.status(404).json({ message: error, })
  }
})

seriesRoutes.get('/', async (req, res) => {
  try {
    const data = await service.listSeries()
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: err })
  }
})

seriesRoutes.get('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params
    const data = await service.showSeries(serieId)
    res.status(200).json({ data })
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

seriesRoutes.get('/actors/:actorName', async (req, res) => {
  try {
    const { actorName } = req.params
    const data = await service.showActorName(actorName)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

seriesRoutes.get('/series/:premier_date', async (req, res) => {
  try {
    const { premier_date } = req.params
    const data = await service.showSerieByDate(premier_date)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

seriesRoutes.put('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params
    const { serie, number_seasons, original_lenguage, features_seasons } =
      req.body
    const data = await service.editSeries(
      serieId, serie, number_seasons, original_lenguage, features_seasons)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

seriesRoutes.delete('/:serieId', async (req, res) => {
  try {
    const { serieId } = req.params
    const removed = await service.removeSeries(serieId)
    res.status(200).json(removed)
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

module.exports = seriesRoutes

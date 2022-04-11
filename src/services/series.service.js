const serieModel = require('../models/series.models')
const boom = require('@hapi/boom')

class serieService {
  async createSeries(serie) {
    serie.save()
    return serie
  }

  async listSeries() {
    return serieModel.find()
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(serieModel.find())
      }, 3000)
    })
  }

  async showSeries(seriesId) {
    return serieModel.findById({ _id: seriesId })
  }

  async editSeries(seriesId, serie, number_seasons, original_lenguage, features_seasons) {
    return serieModel.findById({ _id: seriesId }).then((serieFind) => {
      if (!serieModel) throw Boom.notFound('No se encontro la serie')
      return serieModel.updateOne(
        { seriesId },
        { serie, number_seasons, original_lenguage, features_seasons }
      )
    }
    )
  }

  async showActorName(actor_Name) {
    const series = await serieModel.find()
    const serieActor = series.filter((serie) =>
      serie.features_seasons.cast.includes(actor_Name))
    return serieActor
  }
  async showByDate(premier_date) {
    return serieModel.find({ 'features_seasons.premier_date': premier_date })
  }

  async removeSeries(seriesId) {
    return serieModel.findById({ _id: seriesId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound('Serie no encontrada')
      return serieModel.deleteOne(serrieFind)
    })
  }
}
module.exports = serieService

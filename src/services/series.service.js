const serieShema = require('../models/series.models')

class serieService {

  async createSeries(serie) {
    serie.save()
    return serie
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      resolve(serieShema.find())
    })
  }
  async showSeries(seriesId) {
    return serieShema.findById({ _id: seriesId })
  }
  async editSeries(seriesId, serie, number_seasons, original_lenguage, features_seasons) {
    return serieShema.updateOne(
      { _id: seriesId },
      { seriesId, serie, number_seasons, original_lenguage, features_seasons }
    )
  }
  async removeSeries(seriesId) {
    const removeSerie = serieShema.findById({ _id: seriesId })
    return serieShema.deleteOne(removeSerie)
  }
  async showActorName(actor_Name) {
    const series = await serieShema.find()
    const serieActor = series.filter((serie) =>
      serie.features_seasons.cast.includes(actor_Name))
    return serieActor
  }
  async showByDate(premier_date) {
    return serieShema.find({ 'features_seasons.premier_date': premier_date })
  }
}
module.exports = serieService

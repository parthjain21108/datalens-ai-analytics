import { useQuery, useMutation, useQueryClient } from 'react-query'
import api from '../services/api'

export function useDatasets() {
  return useQuery('datasets', async () => {
    const res = await api.get('/datasets')
    return res.data.datasets
  })
}

export function useDataset(id) {
  return useQuery(['datasets', id], async () => {
    const res = await api.get(`/datasets/${id}`)
    return res.data.dataset
  }, { enabled: !!id })
}

export function useDeleteDataset() {
  const qc = useQueryClient()
  return useMutation(
    id => api.delete(`/datasets/${id}`),
    { onSuccess: () => qc.invalidateQueries('datasets') }
  )
}

export function useAnalytics(id, field) {
  return useQuery(['analytics', id, field], async () => {
    const res = await api.get(`/analytics/${id}?field=${field}`)
    return res.data
  }, { enabled: !!(id && field) })
}

export function useCorrelations(id) {
  return useQuery(
    ['correlations', id],
    async () => {
      const res = await api.get(
        `/analytics/${id}/correlations`
      )

      return res.data
    },
    {
      enabled: !!id,
    }
  )
}
export function useInsights(id) {
  return useQuery(
    ['insights', id],

    async () => {
      const res = await api.get(
        `/analytics/${id}/insights`
      )

      return res.data.insights
    },

    {
      enabled: !!id,
    }
  )
}

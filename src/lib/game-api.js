import { requireSupabase } from './supabase.js'

async function rpc(name, args) {
  const client = requireSupabase()
  const { data, error } = await client.rpc(name, args)
  if (error) throw error
  return data
}

export async function grantItem(itemId, quantity, reason = 'gameplay_reward') {
  return rpc('grant_item', { p_item_id: itemId, p_quantity: quantity, p_reason: reason })
}

export async function grantGold(amount, reason = 'gameplay_reward') {
  return rpc('grant_gold', { p_amount: amount, p_reason: reason })
}

export async function updateQuest(questId, status, progress = {}) {
  return rpc('set_quest_progress', { p_quest_id: questId, p_status: status, p_progress: progress })
}

export async function getInventory() {
  const client = requireSupabase()
  const { data, error } = await client.from('player_inventory').select('item_id, quantity, metadata, updated_at').order('item_id')
  if (error) throw error
  return data ?? []
}

export async function getProgress() {
  const client = requireSupabase()
  const { data, error } = await client.from('player_progress').select('quest_id, status, progress, updated_at').order('quest_id')
  if (error) throw error
  return data ?? []
}

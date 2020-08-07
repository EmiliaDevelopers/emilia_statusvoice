ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

Citizen.CreateThread(function()
	Citizen.Wait(1000)
	local players = ESX.GetPlayers()

	for _,playerId in ipairs(players) do
		local xPlayer = ESX.GetPlayerFromId(playerId)

		MySQL.Async.fetchAll('SELECT status FROM users WHERE identifier = @identifier', {
			['@identifier'] = xPlayer.identifier
		}, function(result)
			local data = {}

			if result[1].status then
				data = json.decode(result[1].status)
			end

			xPlayer.set('status', data)
			TriggerClientEvent('esx_status:load', playerId, data)
		end)
	end
end)

AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
	MySQL.Async.fetchAll('SELECT status FROM users WHERE identifier = @identifier', {
		['@identifier'] = xPlayer.identifier
	}, function(result)
		local data = {}

		if result[1].status then
			data = json.decode(result[1].status)
		end

		xPlayer.set('status', data)
		TriggerClientEvent('esx_status:load', playerId, data)
	end)
end)

AddEventHandler('esx:playerDropped', function(playerId, reason)
	local xPlayer = ESX.GetPlayerFromId(playerId)
	local status = xPlayer.get('status')

	MySQL.Async.execute('UPDATE users SET status = @status WHERE identifier = @identifier', {
		['@status']     = json.encode(status),
		['@identifier'] = xPlayer.identifier
	})
end)

AddEventHandler('esx_status:getStatus', function(playerId, statusName, cb)
	local xPlayer = ESX.GetPlayerFromId(playerId)
	local status  = xPlayer.get('status')

	for i=1, #status, 1 do
		if status[i].name == statusName then
			cb(status[i])
			break
		end
	end
end)

RegisterServerEvent('esx_status:update')
AddEventHandler('esx_status:update', function(status)
	local xPlayer = ESX.GetPlayerFromId(source)

	if xPlayer then
		xPlayer.set('status', status)
	end
end)

function SaveData()
	local xPlayers = ESX.GetPlayers()

	for i=1, #xPlayers, 1 do
		local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
		local status  = xPlayer.get('status')

		MySQL.Async.execute('UPDATE users SET status = @status WHERE identifier = @identifier', {
			['@status']     = json.encode(status),
			['@identifier'] = xPlayer.identifier
		})
	end

	SetTimeout(10 * 60 * 1000, SaveData)
end

SaveData()

-- Update Checker
local CurrentVersion = '1.1.0'

PerformHttpRequest('https://raw.githubusercontent.com/EmiliaDevelopers/emilia_statusvoice/master/version', function(Error, NewestVersion, Header)
		print('[^2emilia_statusvoice^0] Current Version: ' .. CurrentVersion)
		print('[^2emilia_statusvoice^0] Updater version: ' .. NewestVersion)
		if CurrentVersion ~= NewestVersion then
			print('\n')
			print('[^2Updater version^0]')
			print('## ^2Please check the GitHub and download the last update^0')
			print('## ^3https://github.com/EmiliaDevelopers/emilia_statusvoice^0')
		else
		    print('\n')
			print('[^2emilia_statusvoice^0] Authenticated with emilia.developers')
			print('[^2emilia_statusvoice^0] Thanks you! Supporpting this script Welcome!')
		end
		print('\n')
end)

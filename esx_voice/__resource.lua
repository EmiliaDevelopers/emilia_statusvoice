--[[
	resource: esx_voice
	desc: ESX Voice Controller
	author: Emilia Dev
	contact: github.com/Emilia-Dev
]]

resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'ESX Voice Controller By. Emilia Dev'

version '1.1.0'

ui_page 'ui.html'

files {
	'ui.html',
}

client_scripts {
	'@es_extended/locale.lua',
	'client/main.lua'
}

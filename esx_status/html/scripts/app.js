(function () {
	let status = [];

	let renderStatus = function () {

		$('#status_list').html('');

		for (let i = 0; i < 2; i++) {

			if (!status[i].visible) {
				continue;
			}

			let statusDiv = $(
				'<div class="hunger">' +
                    '<i class="fas fa-hamburger fa-lg"></i>' +
                '</div>' +
				'<div class="thirst">' +
                    '<i class="fas fa-tint fa-lg"></i>' +
                '</div>' +
				'<div class="status">' +
					'<div class="status_inner">' +
						'<div class="status_val"></div>' +
					'</div>' +
				'</div>');
			if (status[i].val < 100000) {	
			statusDiv.find('.status_inner')
				.css({ 
					'background-color': 'rgb(255, 0, 0, 0.5)',
					'animation': 'blinker 1s linear infinite',
					})
				;
			}
			
			if (status[i].val > 100000) {			
				statusDiv.find('.status_val')
					.css({
						'background-color': status[i].color,
						'width': (status[i].val / 10000) + '%'
						})
					;
			} else {
				statusDiv.find('.status_val')
					.css({
						'background-color': status[i].color,
						'width': (status[i].val / 10000) + '%'
						})
					;
			};
			
			$('#status_list').append(statusDiv);
		}

	};

	window.onData = function (data) {
		if (data.update) {
			status.length = 0;

			for (let i = 0; i < data.status.length; i++) {
				status.push(data.status[i]);
			}

			renderStatus();
		}

		if (data.setDisplay) {
			$('#status_list').css({ 'opacity': data.display });
			$('.container').css({ 'opacity': data.display });
		}
	};

	window.onload = function (e) {
		window.addEventListener('message', function (event) {
			onData(event.data);
			
			var data = event.data;
		
			if (data.health < 30) {
				
				$('#heal_inner').css('animation', 'blinker 1s linear infinite');
				$('#heal_inner').css('background-color', 'rgb(255, 0, 0, 0.5)');
				$('#boxHeal').css('width', data.health + '%');
				$('#boxHeal').show();
				$('#heal').show();
				$('#heal_inner').show();
				
			} else {
				
				$('#heal_inner').css('animation', 'blinker-stop');
				$('#heal_inner').css('background-color', 'transparent');
				$('#boxHeal').css('width', data.health + '%');
				$('#boxHeal').show();
				$('#heal').show();
				$('#heal_inner').show();
				
			}

			if (data.armor > 0 ) {

				$('#boxArmor').css('width', data.armor + '%');
				$('#boxArmor').show();
				$('#armor').show();
				$('#armor_inner').show();		
				$('#stamina').hide();
				$('#stamina_inner').hide();
				$('#boxStamina').hide();
				
				if (data.stamina == 100) {
					
					$('#stamina2').hide();
					$('#stamina_inner2').hide();
					$('#boxStamina2').hide();
					
				} else if (data.stamina < 10) {
					
					$('#stamina_inner2').css('animation', 'blinker 1s linear infinite');
					$('#stamina_inner2').css('background-color', 'rgb(255, 0, 0, 0.5)');
					$('#boxStamina2').css('width', data.stamina + '%');
					$('#boxStamina2').show();
					$('#stamina2').show();
					$('#stamina_inner2').show();
					
				} else {
					
					$('#stamina_inner2').css('animation', 'blinker-stop');
					$('#stamina_inner2').css('background-color', 'transparent');
					$('#boxStamina2').css('width', data.stamina + '%');
					$('#boxStamina2').show();
					$('#stamina2').show();
					$('#stamina_inner2').show();
					
				}
				
				$('#diving').hide();
				$('#diving_inner').hide();
				$('#boxDiving').hide();
				
				if (data.stamina == 100) {
					
					$('#diving3').hide();
					$('#diving_inner3').hide();
					$('#boxDiving3').hide();
					
					if (data.diving >= 100) {
					
						$('#diving2').hide();
						$('#diving_inner2').hide();
						$('#boxDiving2').hide();
						
					} else if (data.diving < 32) {
							
						$('#diving_inner2').css('animation', 'blinker 1s linear infinite');
						$('#diving_inner2').css('background-color', 'rgb(255, 0, 0, 0.5)');
						$('#boxDiving2').css('width', data.diving + '%');
						$('#boxDiving2').show();
						$('#diving2').show();
						$('#diving_inner2').show();
							
					} else {	
						
						$('#diving_inner2').css('animation', 'blinker-stop');
						$('#diving_inner2').css('background-color', 'transparent');		
						$('#boxDiving2').css('width', data.diving + '%');
						$('#boxDiving2').show();
						$('#diving2').show();
						$('#diving_inner2').show();
						
					}
					
				} else {
					
					$('#diving2').hide();
					$('#diving_inner2').hide();
					$('#boxDiving2').hide();
					
					if (data.diving >= 100) {
					
						$('#diving3').hide();
						$('#diving_inner3').hide();
						$('#boxDiving3').hide();
						
					} else if (data.diving < 32) {
							
						$('#diving_inner3').css('animation', 'blinker 1s linear infinite');
						$('#diving_inner3').css('background-color', 'rgb(255, 0, 0, 0.5)');
						$('#boxDiving3').css('width', data.diving + '%');
						$('#boxDiving3').show();
						$('#diving3').show();
						$('#diving_inner3').show();
							
					} else {	
						
						$('#diving_inner3').css('animation', 'blinker-stop');
						$('#diving_inner3').css('background-color', 'transparent');		
						$('#boxDiving3').css('width', data.diving + '%');
						$('#boxDiving3').show();
						$('#diving3').show();
						$('#diving_inner3').show();
						
					}
					
				}
				
			} else if (data.armor == 0 ) {
				
				$('#boxArmor').hide();
				$('#armor').hide();		
				$('#stamina2').hide();
				$('#stamina_inner2').hide();
				$('#boxStamina2').hide();
				
				
				if (data.stamina == 100) {
					
					$('#stamina').hide();
					$('#stamina_inner').hide();
					$('#boxStamina').hide();
					
				} else if (data.stamina < 10) {
					
					$('#stamina_inner').css('animation', 'blinker 1s linear infinite');
					$('#stamina_inner').css('background-color', 'rgb(255, 0, 0, 0.5)');
					$('#boxStamina').css('width', data.stamina + '%');
					$('#boxStamina').show();
					$('#stamina').show();
					$('#stamina_inner').show();
					
				} else {
					
					$('#stamina_inner').css('animation', 'blinker-stop');
					$('#stamina_inner').css('background-color', 'transparent');
					$('#boxStamina').css('width', data.stamina + '%');
					$('#boxStamina').show();
					$('#stamina').show();
					$('#stamina_inner').show();
					
				}
				
				$('#diving3').hide();
				$('#diving_inner3').hide();
				$('#boxDiving3').hide();
				
				if (data.stamina == 100) {
					
					$('#diving2').hide();
					$('#diving_inner2').hide();
					$('#boxDiving2').hide();
					
					if (data.diving >= 100) {
					
						$('#diving').hide();
						$('#diving_inner').hide();
						$('#boxDiving').hide();
						
					} else if (data.diving < 32) {
							
						$('#diving_inner').css('animation', 'blinker 1s linear infinite');
						$('#diving_inner').css('background-color', 'rgb(255, 0, 0, 0.5)');
						$('#boxDiving').css('width', data.diving + '%');
						$('#boxDiving').show();
						$('#diving').show();
						$('#diving_inner').show();
							
					} else {	
						
						$('#diving_inner').css('animation', 'blinker-stop');
						$('#diving_inner').css('background-color', 'transparent');		
						$('#boxDiving').css('width', data.diving + '%');
						$('#boxDiving').show();
						$('#diving').show();
						$('#diving_inner').show();
						
					}
					
				} else {
					
					$('#diving').hide();
					$('#diving_inner').hide();
					$('#boxDiving').hide();
					
					if (data.diving >= 100) {
					
						$('#diving2').hide();
						$('#diving_inner2').hide();
						$('#boxDiving2').hide();
						
					} else if (data.diving < 32) {
							
						$('#diving_inner2').css('animation', 'blinker 1s linear infinite');
						$('#diving_inner2').css('background-color', 'rgb(255, 0, 0, 0.5)');
						$('#boxDiving2').css('width', data.diving + '%');
						$('#boxDiving2').show();
						$('#diving2').show();
						$('#diving_inner2').show();
							
					} else {	
						
						$('#diving_inner2').css('animation', 'blinker-stop');
						$('#diving_inner2').css('background-color', 'transparent');		
						$('#boxDiving2').css('width', data.diving + '%');
						$('#boxDiving2').show();
						$('#diving2').show();
						$('#diving_inner2').show();
						
					}
					
				}	
			}
			
		});
	};

})();
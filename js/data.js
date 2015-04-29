function jsonReader(link) {
	var req = new XMLHttpRequest();
	messageTable('Loading table…');
	req.open('GET', link, true);

	req.onreadystatechange = function () {
  		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
     			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText); 
				//tableBuilder(objJson);
				rowBuilder(objJson);
				
			}
     			else {
				messageTable('Fail to load table…');
				console.log("Fail to load data.\n");
     			}
  		}
	};
	req.send(null);
}

function tableBuilder(arr){
	removeTable();
	var dataTable = '<thead><tr><th>#</th><th>' + capitalizeFirstLetter(arr.name) + '</th><th>' + capitalizeFirstLetter(arr.group) + '</th></tr></thead><tbody>';
	for(i = 0; i < arr.anime.length; ++i) {
		dataTable += '<tr>';
		dataTable += '<td><img src="' + arr.anime[i].image + '" class="img-responsive voc_list_preview_img" alt="" title="" /></td>';
		dataTable += '<td>' + arr.anime[i].name + '</td>';
		dataTable += '<td>';
		for (j = 0; j < arr.anime[i].group.length; ++j) {
			dataTable += '<span class="' + arr.anime[i].group[j].status +'">';
			for (k = 0; k < arr.anime[i].group[j].detail.length; ++k) {
				if(arr.anime[i].group[j].detail[k].url) {
					dataTable += '<a href="' + arr.anime[i].group[j].detail[k].url + '" target="_blank" >' + arr.anime[i].group[j].detail[k].name + '</a>';
				}
				else {
					dataTable += arr.anime[i].group[j].detail[k].name;
				}
				if(k != arr.anime[i].group[j].detail.length-1) {
					dataTable += ' ' + String.fromCharCode(38) + ' ';
				}
			}
			dataTable += '</span>';
			if(j != arr.anime[i].group.length-1) {
				dataTable += '<br>';
			}
		}
		if (arr.anime[i].group.length === 0) {
			dataTable += 'N/A';
		}
		dataTable += '</td>';
	}
	dataTable += '</tbody>';
	
	//write dataTable
	var b_tableAnime = document.getElementById('tableAnime');
        var Newb_tableAnime = b_tableAnime.cloneNode(false);
        Newb_tableAnime.innerHTML = dataTable;
        b_tableAnime.parentNode.replaceChild(Newb_tableAnime, b_tableAnime);
}

function rowBuilder(arr){
	removeTable();
	var dataTable = '';
	for(i = 0; i < arr.anime.length; ++i) {
		dataTable += '<div class="col-md-4 col-xs-height">';
		dataTable += '<img class="img-circle" src="' + arr.anime[i].image + '" width="140" height="auto">';
		dataTable += '<h3>' + arr.anime[i].name + '</h3>';
		//dataTable += '<p>';
		for (j = 0; j < arr.anime[i].group.length; ++j) {
			dataTable += '<p class="' + arr.anime[i].group[j].status +'">';
			for (k = 0; k < arr.anime[i].group[j].detail.length; ++k) {
				if(arr.anime[i].group[j].detail[k].url) {
					dataTable += '<a href="' + arr.anime[i].group[j].detail[k].url + '" target="_blank" >' + arr.anime[i].group[j].detail[k].name + '</a>';
				}
				else {
					dataTable += arr.anime[i].group[j].detail[k].name;
				}
				if(k != arr.anime[i].group[j].detail.length-1) {
					dataTable += ' ' + String.fromCharCode(38) + ' ';
				}
			}
			dataTable += '</p>';
			if(j != arr.anime[i].group.length-1) {
				dataTable += '<br>';
			}
		}
		if (arr.anime[i].group.length === 0) {
			dataTable += '<p>N/A</p>';
		}
		dataTable += '</div>';
	}
	//dataTable += '</div>';
	alert(dataTable);
	//write dataTable
	var b_tableAnime = document.getElementById('tableAnime');
        var Newb_tableAnime = b_tableAnime.cloneNode(false);
        Newb_tableAnime.innerHTML = dataTable;
        b_tableAnime.parentNode.replaceChild(Newb_tableAnime, b_tableAnime);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function messageTable(string) {
	document.getElementById('tableAnime').innerHTML = string;
}

function removeTable() {
	document.getElementById('tableAnime').innerHTML = '';
}

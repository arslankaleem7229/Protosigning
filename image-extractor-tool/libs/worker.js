var len, buf32, col, histG;
self.addEventListener('message', function(e) {
	//console.log(e.data.buf32.length);
	buf32 = e.data.buf32;
	if(buf32)
	{
		len = buf32.length;
		histG = e.data.histG;

		for (var i = 0; i < len; i++) {
			col = buf32[i];

			// skip transparent
			if ((col & 0xff000000) >> 24 == 0) continue;

			// collect hue stats
			//if (hueStats)
				//hueStats.check(col);

			if (col in histG)
				histG[col]++;
			else
				histG[col] = 1;
		}
		self.postMessage({
		histG : JSON.stringify(histG)
		});
	}

	
}, false);
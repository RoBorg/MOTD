;(function($, undefined)
{
	"use strict";
	
	var i, Colour, MotdGenerator;
	
	Colour = function()
	{
		this.cache = [];
	};
	
	Colour.prototype.shellToHexTable = [
		'000000', '800000', '008000', '808000', '000080', '800080', '008080', 'c0c0c0', '808080', 'ff0000', '00ff00', 'ffff00', '0000ff', 'ff00ff', '00ffff', 'ffffff',
		'000000', '00005f', '000087', '0000af', '0000d7', '0000ff', '005f00', '005f5f', '005f87', '005faf', '005fd7', '005fff', '008700', '00875f', '008787', '0087af',
		'0087d7', '0087ff', '00af00', '00af5f', '00af87', '00afaf', '00afd7', '00afff', '00d700', '00d75f', '00d787', '00d7af', '00d7d7', '00d7ff', '00ff00', '00ff5f',
		'00ff87', '00ffaf', '00ffd7', '00ffff', '5f0000', '5f005f', '5f0087', '5f00af', '5f00d7', '5f00ff', '5f5f00', '5f5f5f', '5f5f87', '5f5faf', '5f5fd7', '5f5fff',
		'5f8700', '5f875f', '5f8787', '5f87af', '5f87d7', '5f87ff', '5faf00', '5faf5f', '5faf87', '5fafaf', '5fafd7', '5fafff', '5fd700', '5fd75f', '5fd787', '5fd7af',
		'5fd7d7', '5fd7ff', '5fff00', '5fff5f', '5fff87', '5fffaf', '5fffd7', '5fffff', '870000', '87005f', '870087', '8700af', '8700d7', '8700ff', '875f00', '875f5f',
		'875f87', '875faf', '875fd7', '875fff', '878700', '87875f', '878787', '8787af', '8787d7', '8787ff', '87af00', '87af5f', '87af87', '87afaf', '87afd7', '87afff',
		'87d700', '87d75f', '87d787', '87d7af', '87d7d7', '87d7ff', '87ff00', '87ff5f', '87ff87', '87ffaf', '87ffd7', '87ffff', 'af0000', 'af005f', 'af0087', 'af00af',
		'af00d7', 'af00ff', 'af5f00', 'af5f5f', 'af5f87', 'af5faf', 'af5fd7', 'af5fff', 'af8700', 'af875f', 'af8787', 'af87af', 'af87d7', 'af87ff', 'afaf00', 'afaf5f',
		'afaf87', 'afafaf', 'afafd7', 'afafff', 'afd700', 'afd75f', 'afd787', 'afd7af', 'afd7d7', 'afd7ff', 'afff00', 'afff5f', 'afff87', 'afffaf', 'afffd7', 'afffff',
		'd70000', 'd7005f', 'd70087', 'd700af', 'd700d7', 'd700ff', 'd75f00', 'd75f5f', 'd75f87', 'd75faf', 'd75fd7', 'd75fff', 'd78700', 'd7875f', 'd78787', 'd787af',
		'd787d7', 'd787ff', 'd7af00', 'd7af5f', 'd7af87', 'd7afaf', 'd7afd7', 'd7afff', 'd7d700', 'd7d75f', 'd7d787', 'd7d7af', 'd7d7d7', 'd7d7ff', 'd7ff00', 'd7ff5f',
		'd7ff87', 'd7ffaf', 'd7ffd7', 'd7ffff', 'ff0000', 'ff005f', 'ff0087', 'ff00af', 'ff00d7', 'ff00ff', 'ff5f00', 'ff5f5f', 'ff5f87', 'ff5faf', 'ff5fd7', 'ff5fff',
		'ff8700', 'ff875f', 'ff8787', 'ff87af', 'ff87d7', 'ff87ff', 'ffaf00', 'ffaf5f', 'ffaf87', 'ffafaf', 'ffafd7', 'ffafff', 'ffd700', 'ffd75f', 'ffd787', 'ffd7af',
		'ffd7d7', 'ffd7ff', 'ffff00', 'ffff5f', 'ffff87', 'ffffaf', 'ffffd7', 'ffffff', '080808', '121212', '1c1c1c', '262626', '303030', '3a3a3a', '444444', '4e4e4e',
		'585858', '606060', '666666', '767676', '808080', '8a8a8a', '949494', '9e9e9e', 'a8a8a8', 'b2b2b2', 'bcbcbc', 'c6c6c6', 'd0d0d0', 'dadada', 'e4e4e4', 'eeeeee'
	];
	
	Colour.prototype.hexToShellTable = {};
	
	for (i = 0; i < 256; i++)
		Colour.prototype.hexToShellTable[Colour.prototype.shellToHexTable[i]] = i;
	
	Colour.prototype.toHex = function(x)
	{
		var hex = x.toString(16);
		
		return hex.length === 1 ? '0' + hex : hex;
	};
	
	Colour.prototype.rgbToHex = function(r, g, b)
	{
		return '' + this.toHex(r) + this.toHex(g) + this.toHex(b);
	};
	
	Colour.prototype.rgbToShell = function(r, g, b)
	{
		var i, c, c16, distance, distance16, greyDistance, grey, hex,
			rgb = [r, g, b],
			rgb16 = [r, g, b],
			greyThreshold = 10,
			cacheKey = (r * 256 * 256) + (g * 256) + b;
		
		if (this.cache[cacheKey] !== undefined)
			return this.cache[cacheKey];
		
		for (i = 0; i < 3; i++)
		{
			c = Math.round((rgb[i] - 0x5f) / 0x28) * 0x28 + 0x5f;
			c16 = Math.round(rgb[i] / 0x80) * 0x80;
			
			if (c < 0x5f)
				c = 0;
			
			rgb[i] = c;
			rgb16[i] = Math.min(c16, 0xff);
		}
		
		distance = this.getDistance(r, g, b, rgb[0], rgb[1], rgb[2]);
		distance16 = this.getDistance(r, g, b, rgb16[0], rgb16[1], rgb16[2]); 
		
		if ((distance16 < distance) && (this.hexToShellTable[this.rgbToHex(rgb16[0], rgb16[1], rgb16[2])] !== undefined))
		{
			distance = distance16;
			rgb = rgb16;
		}
		
		if ((Math.abs(r - g) < greyThreshold) && (Math.abs(r - b) < greyThreshold))
		{
			for (i = 232; i < 256; i++)
			{
				grey = parseInt(this.shellToHexTable[i].substr(0, 2), 16);
				greyDistance = this.getDistance(r, g, b, grey, grey, grey);
				
				if (greyDistance < distance)
				{
					distance = greyDistance;
					rgb = [grey, grey, grey];
				}
			}
		}
		
		hex = this.rgbToHex(rgb[0], rgb[1], rgb[2]);
		
		this.cache[cacheKey] = this.hexToShellTable[hex];
		
		return this.cache[cacheKey];
	};
	
	Colour.prototype.getDistance = function(r1, g1, b1, r2, g2, b2)
	{
		var dr = r1 - r2,
			dg = g1 - g2,
			db = b1 - b2;
		
		return (dr * dr) + (dg * dg) + (db * db);
	};
	
	MotdGenerator = function()
	{
		this.image = new Image();
		this.imageData = '';
		this.imageWidth = 0;
		this.imageHeight = 0;
		this.outputWidth = 0;
		this.outputHeight = 0;
		this.shellPixels = [];
	};
	
	MotdGenerator.prototype.run = function(outputWidth, imageData)
	{
		var self = this,
			deferred = new $.Deferred();
		
		this.outputWidth = outputWidth;
		
		this.image.onload = function()
		{
			self.imageWidth = this.width;
			self.imageHeight = this.height;
			
			// Output height scaled by 0.5 to account for text characters being approx twice as tall as wide
			self.outputHeight = Math.round(self.imageHeight * (self.outputWidth / self.imageWidth) * 0.5);
			
			self.process();
			
			deferred.resolve();
		};
		
		this.imageData = imageData;
		this.image.src = imageData;
		
		return deferred.promise();
	};
	
	MotdGenerator.prototype.process = function()
	{
		var i, len, size, imageData,
			canvasElement = $('<canvas/>'),
			ctx = canvasElement[0].getContext('2d'),
			colour = new Colour();
		
		size = {
			width: this.outputWidth,
			height: this.outputHeight
		};
		
		canvasElement.attr(size);
		
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, this.outputWidth, this.outputHeight);
		
		ctx.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, 0, 0, this.outputWidth, this.outputHeight);
		
		imageData = ctx.getImageData(0, 0, this.outputWidth, this.outputHeight).data;
		len = imageData.length;
		
		for (i = 0; i < len; i += 4)
			this.shellPixels.push(colour.rgbToShell(imageData[i], imageData[i + 1], imageData[i + 2]));
	};
	
	MotdGenerator.prototype.getHtml = function()
	{
		var i, lastColour,
			newLine = false,
			runLength = 0,
			len = this.shellPixels.length,
			output = '';
		
		for (i = 0; i < len; i++)
		{
			if (!(i % this.outputWidth))
				newLine = true;
			
			if (newLine || (this.shellPixels[i] !== lastColour))
			{
				if (runLength !== 0)
				{
					output += '<span style="background-color: #' + Colour.prototype.shellToHexTable[lastColour] + ';">'
						+ ' '.repeat(runLength) + '</span>';
					
					if (newLine)
						output += '\n';
				}
				
				lastColour = this.shellPixels[i];
				runLength = 0;
				newLine = false;
			}
			
			runLength++;
		}
		
		if (runLength !== 0)
		{
			output += '<span style="background-color: #' + Colour.prototype.shellToHexTable[lastColour] + ';">'
				+ ' '.repeat(runLength) + '</span>';
		}
		
		return output;
	};
	
	MotdGenerator.prototype.getCode = function()
	{
		var i, lastColour,
			newLine = false,
			runLength = 0,
			len = this.shellPixels.length,
			output = '';
		
		for (i = 0; i < len; i++)
		{
			if (!(i % this.outputWidth))
				newLine = true;
			
			if (newLine || (this.shellPixels[i] !== lastColour))
			{
				if (runLength !== 0)
				{
					output += '\\e[48;5;' + lastColour + 'm' + ' '.repeat(runLength);
					
					if (newLine)
						output += '\\e[0m\n';
				}
				
				lastColour = this.shellPixels[i];
				runLength = 0;
				newLine = false;
			}
			
			runLength++;
		}
		
		if (runLength !== 0)
		{
			output += '\\e[48;5;' + lastColour + 'm' + ' '.repeat(runLength)
				+ '\\e[0m';
		}
		
		return output;
	};
	
	$(function()
	{
		$('#form').on('submit', function(e)
		{
			var files,
				reader = new FileReader(),
				motdGenerator = new MotdGenerator();
			
			e.preventDefault();
			
			files = $('#file')[0].files;
			
			reader.onload = function(e)
			{
				$.when(motdGenerator.run($('#output-width').val(), e.target.result)).then(function()
				{
					$('<pre>').html(motdGenerator.getHtml()).appendTo('body');
					$('<textarea>').val(motdGenerator.getCode()).appendTo('body');
				});
			};
			
			reader.readAsDataURL(files[0]);
		});
	});
})(jQuery);

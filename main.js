const canvasSel = '#myCanvas'
const {canvas, ctx, bb} = getCanvas(canvasSel)

function main() {
  const experiment = new Experiment()

  // Update Candidate Details
  updateCandidateDetails(Experiment)

  console.log({canvas, ctx, bb})

  experiment.run()
}

// FIXME: Relax the validators for multiple names
function updateCandidateDetails({rollNos,names}) {
  let isValidRollNo, isValidName, act, byHtml, n
  isValidRollNo = (isValidName = false)

  // Validate RollNo
  
  rollNos = rollNos.split(',')
    .map(
      s => Number(s.trim())
    )
    .filter(
      n => {
	isValidRollNo = !isNaN(n) && 9999999 < n
	if (!isValidRollNo) {
	  console.warn({invalidRollNo: n,
			message: "Roll No should be Integer."})
	}
	return isValidRollNo
      }
    )

  // Validate Name
  const titleCasePat = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/
  names = String(names).trim()

  act = names.split('(').shift().trim()
  isValidName = titleCasePat.test(act)
  if (!isValidName) {
    console.warn({invalidAct: act,
		  message: "Act should be in Title Case."})
    act = ''
  }

  names = names.split('(').pop().split(')').shift()
    .split(',').map(s=>s.trim())
    .filter(name => {
      isValidName = titleCasePat.test(name)
      if (!isValidName) {
	console.warn({invalidName: name,
		      message: "Name should be a Title Case."})
      }
      return isValidName
    })
  
  byHtml = ''

  n = Math.min(names.length, rollNos.length)
  for (const i of Array(n).keys()) {
    if (0 < i)
      byHtml = `${byHtml}<span class="p-2">|</span>`

    byHtml = `${byHtml}<code>${rollNos[i]}</code> : ${names[i]}`
  }

  if (0 < act.length) {
    byHtml = `<strong>${act}</strong><br class="hidden md:inline"/><span class="p-4 md:hidden">&mdash;</span>${byHtml}`
  }

  if (0 < byHtml.length) {
    byHtml = `Created by ${byHtml}`
  } else {
    byHtml
      = 'Error parsing candidate details. Check console.'
  }

  document.querySelector('#by')
    .innerHTML = byHtml
}


function saveCanvas() {
  const link = document.createElement('a');
  const { canvas, ctx, bb } = getCanvas(canvasSel);
  
  // Create a new canvas to hold the merged image
  const mergedCanvas = document.createElement('canvas');
  const mergedCtx = mergedCanvas.getContext('2d');

  // Set the dimensions of the new canvas
  mergedCanvas.width = canvas.width;
  mergedCanvas.height = canvas.height;

  // Draw the background image on the merged canvas
  const backgroundImage = new Image();
  backgroundImage.src = 'assets/background.jpg'; // Replace with the URL of your background image
  backgroundImage.onload = function() {
    mergedCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // Draw the original canvas content on top of the background
    mergedCtx.drawImage(canvas, 0, 0);

    // Set up the download link with the data URL of the merged canvas
    link.download = `${slug(Experiment.rollNos)}-${slug(document.title)}-canvas.png`;
    link.href = mergedCanvas.toDataURL();

    // Trigger the download
    link.click();
  };
}

function slug(s) {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(s=>0<s.length)
    .join('-')
}

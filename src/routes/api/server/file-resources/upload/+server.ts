import { uploadBinary } from '$routes/api/services/file.resource';
import type { RequestEvent, RequestHandler } from './$types';
import * as fs from 'fs';

//////////////////////////////////////////////////////////////

export const POST: RequestHandler = async (event: RequestEvent) => {
	try {
		console.log(`Upload in progress---`);

		const formData = await event.request.formData();
		const file = formData.get('file') as File;
		const filename = formData.get('filename');

		if (!file || !filename) {
			return new Response(
				JSON.stringify({ Status: 'error', Message: 'File or filename missing' }),
				{ status: 400 }
			);
		}

		const buffer = await file.arrayBuffer();
		const filePath = `/tmp/${filename}`;
		fs.writeFileSync(filePath, Buffer.from(buffer));

		if (fs.existsSync(filePath)) {
			console.log(`Copied file ${filename} to server /tmp.`);
		}

		const sessionId = event.locals.sessionUser.sessionId;
		const fileBuffer = fs.readFileSync(filePath);

		console.log('Uploading file resource ...');
		const response = await uploadBinary(sessionId, fileBuffer, filename, true);
		console.log(JSON.stringify(response, null, 2));

		fs.unlinkSync(filePath);

		return new Response(JSON.stringify(response), { status: 201 });
	} catch (err) {
		console.error(`Error uploading file: ${err}`);
		return new Response(JSON.stringify({ Status: 'error', Message: err.message }), { status: 500 });
	}
};

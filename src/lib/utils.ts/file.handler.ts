import fs from 'fs';
import path from 'path';

export const processFileData = async (file: File): Promise<{ filePath: string; fileBuffer: Buffer; filename: string }> => {
	const filename = file.name;
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	console.log('File buffer length:', fileBuffer.length);

	const tempDirectory = '/tmp';
	if (!fs.existsSync(tempDirectory)) {
		fs.mkdirSync(tempDirectory);
	}
	const filePath = path.join(tempDirectory, filename);
	fs.writeFileSync(filePath, fileBuffer);
	console.log(`File saved to: ${filePath}`);

	return { filePath, fileBuffer, filename };
};
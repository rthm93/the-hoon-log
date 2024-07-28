const fsPromise = require('node:fs/promises');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const contentFilename = 'content.md';
const metadataFilename = 'metadata.json';
const publicDir = path.join(__dirname, `../public/blogs/`);

async function startProcessAllAsync() {
  await cleanUpBlogsAsync();
  await processAllBlogsAsync();
  await generateBlogsJsonAsync();
}

async function cleanUpBlogsAsync() {
  console.log(`Cleaning up public directory...`);

  const publicBlogsDir = path.join(__dirname, '../public/blogs');
  const items = await fsPromise.readdir(publicBlogsDir);

  for (let item of items) {
    if (item !== '.gitkeep') {
      await fsPromise.unlink(path.join(publicBlogsDir, item));
    }
  }
}

async function processAllBlogsAsync() {
  console.log('Processing blog posts...');
  const blogDirs = await getBlogsDirectories();

  for (let blogDir of blogDirs) {
    await processBlogAsync(blogDir);
  }
}

async function processBlogAsync(blogDir) {
  if (!blogDir ||
    typeof blogDir !== 'string' ||
    !(await fsPromise.stat(blogDir)).isDirectory()) {
    throw new Error(`${blogDir} is an invalid blog directory!`);
  }

  const contentFile = path.join(blogDir, contentFilename);
  const metadataFile = path.join(blogDir, metadataFilename);

  for (let file of [contentFile, metadataFile]) {
    if (!fs.existsSync(file)) {
      throw new Error(`${file} is required!`);
    }
  }

  const metadata = JSON.parse(await fsPromise.readFile(metadataFile, { encoding: 'utf8' }));
  if (!metadata.filename) {
    throw new Error(`filename in ${metadataFile} is required!`);
  }

  const mdContents = await fsPromise.readFile(contentFile, { encoding: 'utf8' });
  const htmlContents = marked.parse(mdContents);
  const outputFile = path.join(publicDir, `${metadata.filename}.html`);
  await fsPromise.writeFile(outputFile, htmlContents);
}

async function generateBlogsJsonAsync() {
  console.log(`Generating blogs.json...`)

  const blogs = [];

  for (let blogDir of (await getBlogsDirectories())) {
    const metadata = JSON.parse(await fsPromise.readFile(path.join(blogDir, metadataFilename), { encoding: 'utf8' }));
    blogs.push({
      tags: metadata.tags,
      src: `/blogs/${metadata.filename}.html`,
      id: metadata.filename,
      sort: metadata.sort,
    })
  }

  await fsPromise.writeFile(path.join(publicDir, `blogs.json`), JSON.stringify({ blogs: blogs.sort((a, b) => b.sort - a.sort) }));
}

async function getDirectoryEntriesAsync() {
  return await Promise.all((await fsPromise.readdir(__dirname)).map(item => path.join(__dirname, item)));
}

async function getBlogsDirectories() {
  return (await Promise.all((await getDirectoryEntriesAsync()).map(async d => {
    const stat = await fsPromise.stat(d);
    return stat.isDirectory() ? d : undefined;
  }))).filter(d => !!d);
}

startProcessAllAsync().then(() => {
  console.log();
  console.log(`Blogs processed successfully.`);
  console.log();
  console.log();
});

const fs = require('fs')

const root = process.argv[2]
const project = process.argv[3]
const out = process.argv[4]

const fileTemplate = `location /space_holder/file_holder {
  root  root_holder;
  index index.html;
  break;
}
`
const template = `location /space_holder {
  root  root_holder;
  index index.html;
  break;
}
location ^~ /space_holder/static/ {
  root  root_holder;
  index index.html;
  break;
}
location ^~ /space_holder/ {
  root    root_holder;
  rewrite ^ /space_holder/index.html break;
}
`

if (root && project) {
  console.log(`准备给 ${project} 生成 SPA Nginx conf`)
  const files = 'index.html|favicon.ico|manifest.json|service-worker.js|asset-manifest.json'.split(
    '|'
  )
  const outFiles = files
    .map(file =>
      fileTemplate
        .replace(/space_holder/g, project)
        .replace(/root_holder/g, root)
        .replace(/file_holder/g, file)
    )
    .join('')
  let conf = template
    .replace(/space_holder/g, project)
    .replace(/root_holder/g, root)
  if (out) {
    conf = `${outFiles}${conf}`
  }
  fs.writeFile(`${project}.conf`, conf, err => {
    if (err) throw err
    console.log(`${project}.conf 创建完成`)
  })
} else {
  console.warn('请输入项目名称')
  console.log('eg: node app.js /work/html sys-master')
}

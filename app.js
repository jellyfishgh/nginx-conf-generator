const fs = require('fs')

const project = process.argv[2]

const template = `location /space_holder/index.html {
  root  /work/html;
  index index.html;
  break;
}
location ^~ /space_holder/static {
  root  /work/html;
  index index.html;
  break;
}
location ^~ /space_holder {
  root  /work/html;
  rewrite ^ /space_holder/index.html  break;
}`

if (project) {
  console.log(`准备给 ${project} 生成 SPA Nginx conf`)
  const conf = template.replace(/space_holder/g, project)
  fs.writeFile(`${project}.conf`, conf, err => {
    if (err) throw err
    console.log(`${project}.conf 创建完成`)
  })
} else {
  console.warn('请输入项目名称')
  console.log('eg: node app.js sys-master')
}

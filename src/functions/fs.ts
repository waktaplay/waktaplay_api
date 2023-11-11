import fs from 'node:fs'

function readDeepDir(distPath: string) {
  return [
    ...fs
      .readdirSync(distPath)
      .filter(file =>
        fs.statSync(`${distPath}/${file}`).isDirectory(),
      )
      .reduce((all: string[], subDir: string) => {
        return [
          ...all,
          ...fs
            .readdirSync(`${distPath}/${subDir}`)
            .map(e => `${subDir}/${e}`),
        ]
      }, []),
    ...fs
      .readdirSync(distPath)
      .filter(
        file => !fs.statSync(`${distPath}/${file}`).isDirectory(),
      ),
  ]
}

export { readDeepDir }

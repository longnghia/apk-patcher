import path from "path";

export function parse_aapt(dumpResult, apkPath) {
  const regex = /name='(.*?)'.*versionName='(.*?)'/;
  const match = dumpResult.match(regex);

  if (match) {
    let packageName = match[1];
    let versionName = match[2];
    let projectDir = `${path.dirname(apkPath)}/${packageName}`;
    let apkName = `${path.basename(apkPath)}`;
    let distPath = `${projectDir}/dist/${apkName}`;

    return { packageName, versionName, projectDir, apkName, distPath };
  } else {
    throw new Error("Can not parse apk info");
  }
}

export const ignoreList = [
  "*",
  "!AndroidManifest.xml",
  "!res/",
  "!res/values/",
  "!res/values/*",
  "!smali*/",
  "!smali*/**",
  "smali/androidx/",
  "smali/com/android/",
  "smali/com/google/",
];

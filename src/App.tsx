import React, { useState } from 'react';
import { FileCode, FileJson, Copy, Check, Terminal } from 'lucide-react';

const files = [
  {
    name: 'MainActivity.java',
    language: 'java',
    icon: <FileCode className="w-4 h-4 text-blue-500" />,
    content: `package com.example.mybasicapp;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}`
  },
  {
    name: 'activity_main.xml',
    language: 'xml',
    icon: <FileCode className="w-4 h-4 text-orange-500" />,
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`
  },
  {
    name: 'AndroidManifest.xml',
    language: 'xml',
    icon: <FileCode className="w-4 h-4 text-orange-500" />,
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.mybasicapp">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyBasicApp">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
  },
  {
    name: 'build.gradle (app)',
    language: 'groovy',
    icon: <FileJson className="w-4 h-4 text-green-500" />,
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.example.mybasicapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.mybasicapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
}`
  },
  {
    name: 'strings.xml',
    language: 'xml',
    icon: <FileCode className="w-4 h-4 text-orange-500" />,
    content: `<resources>
    <string name="app_name">My Basic App</string>
</resources>`
  }
];

export default function App() {
  const [activeFile, setActiveFile] = useState(files[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col font-sans">
      <header className="border-b border-zinc-800 bg-zinc-900 p-4 flex items-center gap-3">
        <Terminal className="w-6 h-6 text-emerald-500" />
        <h1 className="text-lg font-medium text-zinc-100">Android Java Template</h1>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
          <div className="p-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Project Files
          </div>
          <div className="flex-1 overflow-y-auto">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => setActiveFile(file)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  activeFile.name === file.name 
                    ? 'bg-zinc-800 text-zinc-100' 
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                {file.icon}
                {file.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0d1117]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              {activeFile.icon}
              <span className="font-mono">{activeFile.name}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <pre className="font-mono text-sm leading-relaxed text-zinc-300">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

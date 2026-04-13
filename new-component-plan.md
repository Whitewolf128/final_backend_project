* What component I chose?
Multer for File Uploads: Allows users to upload files, such as images or documents, with validation and size restrictions.

** The reason I chose this component?
I chose it in case you want to upload either a lyric of your favourite song .html from that album or maybe a picture of the album to show where it came from to help others look for it.

*** 2-3 ways to integrate it.
    1. from dave bernhards web dev blog, Doing it in react and typescript:
        import React, { useRef, ChangeEvent } from 'react'

        import React, { useRef, ChangeEvent } from 'react'

        const UploadButton = () => {
            const uploadRef =             useRef<HTMLInputElement>(null)
                const handleUpload = () => {
                    console.log('File upload input clicked...')
                }
        

            return (
                <>
                <button onClick={() => uploadRef.current?.click()}>Upload file</button>

                <input
                type="file"
                ref={uploadRef}
                onChange={handleUpload}
                style={{ display: 'none' }}
                />
                </>
    
            )
        }
    2. option 1: Using the FileReader api:
        
        const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files === null) {
            return
        }
        const file = e.target.files[0]

        if (file) {
            if (file.type !== 'text/csv') {
                console.error('Please upload a .csv file')
            }

            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                const contents = event?.target?.result
                // do something with the file contents here
            }

            e.target.value = ''
            fileReader.readAsText(file)
        } else {
            console.error('File could not be uploaded. Please try again.')
        }
        }

    3. all together with better error handling:
        import React, { useRef, useState, ChangeEvent } from 'react'

        const UploadButton = () => {
            const [uploadError, setUploadError] = useState('')
            const uploadRef = useRef<HTMLInputElement>(null)

            const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files === null) {
                return //NULL
                }
                const file = e.target.files[0]

                if (file) {
                    if (file.type !== 'text/csv') {
                        setUploadError('Please upload a .csv file')
                    }

                    const fileReader = new FileReader()
                    fileReader.onload = (event) => {
                        const contents = event?.target?.result
                        // do something with the file contents here
                    }

                    e.target.value = ''
                fileReader.readAsText(file)
                } else {
                    setUploadError('File could not be uploaded. Please try again.')
                }
            }

            return (
                <>
                {/* style this however you like */}
                <button onClick={() => uploadRef.current?.click()}>Upload file</button>

                <input
                    type="file"
                    ref={uploadRef}
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />

                {uploadError ? <p>{uploadError}</p> : null}
                </>
            )
        }
       *note: will fix the .csv thing in milestone 2.
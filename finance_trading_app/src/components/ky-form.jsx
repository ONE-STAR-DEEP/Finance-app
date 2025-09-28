"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function KycForm() {
    const [pan, setPan] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [currentUser, setCurrentUser] = useState();

    const router = useRouter();

    function handleFileChange(e) {
        const nextFile = e.target.files && e.target.files[0] ? e.target.files[0] : null
        setFile(nextFile || null)
        if (nextFile) {
            const url = URL.createObjectURL(nextFile)
            setPreviewUrl(url)
        } else {
            setPreviewUrl(null)
        }
    }
    const [fileName, setFileName] = useState("");

    const onDrop = useCallback(async acceptedFiles => {
        const file = acceptedFiles[0];
        const name = `image-${Date.now()}.jpeg`;

        setFileName(name);

        const url = await putObject(name);

        console.log("Signed PUT URL:", url);

        const upload = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'image/jpeg',
            },
            body: file,
        })

        console.log("Upload response:", upload);

        const getPublicUrl = await getObject(name) // use same name you uploaded
        console.log("Public GET URL:", getPublicUrl);
        setPreviewUrl(getPublicUrl);
        setPost({ ...post, img: name });

    }, []);

    useEffect(() => {
        async function fetchMe() {
          try {
            const res = await fetch("http://localhost:5000/api/auth/me", {
              method: "GET",
              credentials: "include",
            });
    
            if (!res.ok) {
              throw new Error("Failed to fetch user");
            }
    
            const user = await res.json();
            console.log("Logged-in user:", user);
            setCurrentUser(user);
          } catch (err) {
            console.error(err);
            setCurrentUser(null);
          }
        }
    
        fetchMe();
      }, []);

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
          const response = await fetch('http://localhost:5000/api/kyc/upload',
            {
              method: 'POST',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userid: currentUser._id, 
                panNumber: pan, 
                idNumber: idNumber, 
                imgURL: previewUrl
              })
            })
          if (response.ok) {
            const data = await response.json();

            console.log(data)

            router.push('/pages/home')
          }
        } catch (error) {
          console.log(error);
        }

        alert("KYC submitted. Thank you!")
    }

    return (
        <Card className="border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <CardHeader>
                <CardTitle className="text-pretty">KYC Verification</CardTitle>
                <CardDescription>Provide your details for identity verification.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* PAN Number */}
                    <div className="grid gap-2">
                        <Label htmlFor="pan">PAN Number</Label>
                        <Input
                            id="pan"
                            name="pan"
                            inputMode="text"
                            autoComplete="off"
                            placeholder="ABCDE1234F"
                            value={pan}
                            onChange={(e) => setPan(e.target.value.toUpperCase())}
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                            title="Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
                            required
                        />
                        <p className="text-muted-foreground text-xs">Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)</p>
                    </div>

                    {/* ID Number */}
                    <div className="grid gap-2">
                        <Label htmlFor="idNumber">ID Number</Label>
                        <Input
                            id="idNumber"
                            name="idNumber"
                            inputMode="text"
                            autoComplete="off"
                            placeholder="Enter your government ID number"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            minLength={6}
                            required
                        />
                        <p className="text-muted-foreground text-xs">
                            Enter your official identification number (minimum 6 characters).
                        </p>
                    </div>

                    {/* Image Upload */}
                    <div className="grid gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="kycImage">ID Image</Label>
                            <Input id="kycImage" name="kycImage" type="file" accept="image/*" onChange={handleFileChange} />
                            <p className="text-muted-foreground text-xs">Upload a clear photo or scan of your ID (JPG, PNG).</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-24 w-24 overflow-hidden rounded-md border border-border/60 bg-muted">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl || "/placeholder.svg"}
                                        alt="Selected ID preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src="/kyc-id-image-preview.jpg"
                                        alt="No image selected"
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Ensure the image is bright and readable. Avoid glare and blur.
                            </div>
                        </div>
                    </div>

                    <CardFooter className="px-0">
                        <Button type="submit" className="w-full">
                            Submit KYC
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

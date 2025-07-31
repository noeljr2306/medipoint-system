"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Stethoscope,
  Video,
  Check,
  Camera,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";

// Define the schema
const AppointmentSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    gender: z.string().min(1, "Please select your gender"),
    dateOfBirth: z.string().min(1, "Please select your date of birth"),
    appointmentType: z.enum(["in-person", "video"]),
    department: z.string().min(1, "Please select a department"),
    doctor: z.string().min(1, "Please select a doctor"),
    preferredDate: z.string().min(1, "Please select a preferred date"),
    preferredTime: z.string().min(1, "Please select a preferred time"),
    reasonForVisit: z
      .string()
      .min(
        10,
        "Please provide at least 10 characters describing your reason for visit"
      ),
    videoPlatform: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy",
    }),
  })
  .refine(
    (data) => {
      if (data.appointmentType === "video" && !data.videoPlatform) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a video platform for video consultations",
      path: ["videoPlatform"],
    }
  );

type AppointmentFormValues = z.infer<typeof AppointmentSchema>;

interface AppointmentFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ firstName, lastName, email }) => {
  const [loading, setLoading] = useState(false);

  const departments = [
    "General Medicine",
    "Cardiology",
    "Pediatrics",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Psychiatry",
    "Gynecology",
  ];

  const doctorsByDepartment = {
    "General Medicine": [
      "Dr. Sarah Johnson",
      "Dr. Michael Chen",
      "Dr. Emily Davis",
    ],
    Cardiology: [
      "Dr. Robert Wilson",
      "Dr. Lisa Thompson",
      "Dr. David Martinez",
    ],
    Pediatrics: ["Dr. Jennifer Lee", "Dr. Mark Anderson", "Dr. Rachel Green"],
    Dermatology: ["Dr. Kevin Brown", "Dr. Amanda White", "Dr. Steven Taylor"],
    Orthopedics: [
      "Dr. Thomas Miller",
      "Dr. Jessica Garcia",
      "Dr. Christopher Moore",
    ],
    Neurology: [
      "Dr. Patricia Jackson",
      "Dr. James Rodriguez",
      "Dr. Michelle Lewis",
    ],
    Psychiatry: ["Dr. Daniel Harris", "Dr. Laura Clark", "Dr. Anthony Walker"],
    Gynecology: ["Dr. Nancy Hall", "Dr. Karen Allen", "Dr. Elizabeth Young"],
  };

  const form = useForm({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      fullName: firstName,
      email: email,
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      appointmentType: "in-person",
      department: "",
      doctor: "",
      preferredDate: "",
      preferredTime: "",
      reasonForVisit: "",
      videoPlatform: "",
      agreeToTerms: false,
    },
  });

  const appointmentType = useWatch({
    control: form.control,
    name: "appointmentType",
  });

  const selectedDepartment = useWatch({
    control: form.control,
    name: "department",
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    setLoading(true);
    try {
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(
        "Appointment booked successfully! You will receive a confirmation email shortly."
      );
      form.reset();
    } catch (error) {
      console.error("Appointment booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const testCameraMic = () => {
    alert(
      "Camera and microphone test feature would be implemented here. This would typically open a test modal to check device functionality."
    );
  };

  const handleDepartmentChange = (value: string) => {
    form.setValue("department", value);
    form.setValue("doctor", "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl xl:px-6 px-8 mx-auto">
        <Image
          src="/logo.png"
          width={160}
          height={160}
          alt="logo"
          className="mb-8"
        />
        <div className=" mb-12">
          <h1 className="text-4xl font-bold text-zinc-9=700 mb-4">
            Hey, {firstName}
          </h1>
          <p className="sm:text-xl text-gray-600 mx-auto">
            Schedule your appointments with our medical professionals quickly
            and easily
          </p>
        </div>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              {/* Personal Information Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your.email@example.com"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Enter phone number"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Gender *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={loading}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-1 lg:col-span-2">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Date of Birth *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Type Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Appointment Type
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          disabled={loading}
                        >
                          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <FormLabel
                              htmlFor="in-person"
                              className="cursor-pointer flex items-center gap-2 font-medium"
                            >
                              <Stethoscope className="w-5 h-5 text-gray-600" />
                              In-person Consultation
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                            <RadioGroupItem value="video" id="video" />
                            <FormLabel
                              htmlFor="video"
                              className="cursor-pointer flex items-center gap-2 font-medium"
                            >
                              <Video className="w-5 h-5 text-gray-600" />
                              Video Consultation
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Medical Details Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Medical Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Department *
                        </FormLabel>
                        <Select
                          onValueChange={handleDepartmentChange}
                          value={field.value}
                          disabled={loading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Doctor *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedDepartment || loading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue
                                placeholder={
                                  selectedDepartment
                                    ? "Select Doctor"
                                    : "Select Department First"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedDepartment &&
                              doctorsByDepartment[
                                selectedDepartment as keyof typeof doctorsByDepartment
                              ]?.map((doctor) => (
                                <SelectItem key={doctor} value={doctor}>
                                  {doctor}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Preferred Date *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Preferred Time *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reasonForVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Reason for Visit / Symptoms *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Please describe your symptoms or reason for the appointment..."
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-vertical"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Video Consultation Section */}
              {appointmentType === "video" && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <Video className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Video Consultation Setup
                    </h2>
                  </div>

                  <div className="bg-blue-50 rounded-lg space-y-6">
                    <FormField
                      control={form.control}
                      name="videoPlatform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Choose Platform *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={loading}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Select Video Platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="zoom">Zoom</SelectItem>
                              <SelectItem value="google-meet">
                                Google Meet
                              </SelectItem>
                              <SelectItem value="microsoft-teams">
                                Microsoft Teams
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Alert className="bg-white border-blue-200">
                      <Camera className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Please ensure your camera and microphone are working
                          properly before the appointment.
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={testCameraMic}
                          className="ml-4 shrink-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                          disabled={loading}
                        >
                          <Camera className="w-4 h-4 mr-1" />
                          <Mic className="w-4 h-4 mr-1" />
                          Test
                        </Button>
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-green-200 border-blue-200">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-gray-700">
                        <strong>Meeting Link:</strong> Will be generated and
                        sent to your email after booking confirmation.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              )}

              {/* Terms and Submit Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={loading}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm cursor-pointer text-gray-700">
                            I agree to the{" "}
                            <span className="text-blue-600 underline hover:text-blue-800">
                              terms and privacy policy
                            </span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Booking appointment...</span>
                      </div>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Book Appointment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;

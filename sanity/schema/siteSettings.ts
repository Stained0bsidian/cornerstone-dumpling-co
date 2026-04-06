import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Hero Tagline",
      type: "string",
      description: 'Main headline on the homepage, e.g. "Handcrafted Dumplings Worth Savoring"',
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "string",
      description: "Smaller text below the headline",
    }),
    defineField({
      name: "aboutText",
      title: "About / Brand Story",
      type: "text",
      rows: 5,
      description: "Shown in the 'Heritage & craft' section on the homepage",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Cornelius, NC"',
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "orderNote",
      title: "Order Instructions",
      type: "text",
      rows: 3,
      description: "Shown on the checkout page above the form",
    }),
  ],
  preview: {
    select: { title: "businessName" },
  },
});

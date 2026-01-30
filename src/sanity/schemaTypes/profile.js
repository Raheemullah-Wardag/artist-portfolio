import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile & Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline (e.g. Visual Artist based in Tokyo)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'About / Bio',
      type: 'text',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Picture',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
        name: 'email',
        title: 'Email Address',
        type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Link',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Link',
      type: 'url',
    }),
  ],
})
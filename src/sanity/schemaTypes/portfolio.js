// src/sanity/schemaTypes/portfolio.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string', 
      options: {
        list: [
            { title: 'Digital Art', value: 'Digital Art' },
            { title: 'Photography', value: 'Photography' },
            { title: 'Oil Painting', value: 'Oil Painting' },
            { title: 'Sketch', value: 'Sketch' }
        ]
      }
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array', // This allows multiple images (Slideshow)
      of: [{ type: 'image' }], 
      options: {
        layout: 'grid',
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
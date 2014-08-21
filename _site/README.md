# frontendthanks.com

The goal for this site is to show our thanks to Dan and Cherrie for all they have done with Front-End Conf. The hope is that many of you add to the thank you messages, photos, and pass the site around using **#frontendthanks** in your tweets, instagrams, etc.

The site has been built in Jekyll and hosted via GitHub Pages, this makes it easy for you to quickly add to the site. *Note* This will create a pull-request that will be sent to us for approval. If you really don't want to use GitHub to make this happen, [create an issue](https://github.com/mattgraham/frontendthanks/issues/new) and I'll add the message/photo for you. Message me on twitter if you have questions [@michigangraham](http://twitter.com/michigangraham)

## Adding Thank You Messages

Inside the ```_thanks``` folder you'll find a listing of markdown (.md) files, your job is to add to those. Start with the date your adding it then your name ```2014-09-20-Your-Name.md```

Copy and pase the template bellow here: [Add Page](https://github.com/mattgraham/frontendthanks/new/master/_thanks)

<pre>
---
layout: thanks
title: Fonts, shapes and colors
name: Matt Graham
twitter: michigangraham
years: 2013, 2012
---

Your message goes here in markdown format.

# Heading one
## Heading two
### Heading three

etc.
</pre>

## Adding Photos

Real similiar for the photos; inside the ```_photos``` folder you'll find a listing of markdown (.md) files. The photos are not necessarly hosted here, they can be via instagram, your website, dribbble, etc. You just let us know the details in the markdown file and we'll display the image with the correct photo credit.  

Copy and pase the template bellow here: [Add Photo](https://github.com/mattgraham/frontendthanks/new/master/_photos)

<pre>
---
photo_url: "http://scontent-a.cdninstagram.com/hphotos-xfa1/outbound-distilleryimage11/t0.0-17/OBPTH/0c33a51eda7a11e2862522000a1f9c96_7.jpg"
photographer: Dan Denney
twitter: dandenney
year: 2013
---
</pre>


### Running in Development
Have an idea for the site (outside of just adding content)? Fork the site and submit a PR. Keep in mind the goal for the site but we'd love to see what you come up with (just understand we may say no also, but we still love you). Or if you just want to poke around to see how the site was built, what this Jekyll thing is, etc. to get the development setup ready:

```
script/bootstrap
```

Will setup the local environment. This assumes you have Ruby and homebrew installed.

```
script/server
```

Will get the local server up and running AND watch the SCSS files with Compass. Please don't make modifications to the CSS directly, all edits should happen in the SCSS files and will compile from there.

As your adding features please use branches and submit pull requests back into master. This will keep us all on the same page and direction. Also, **do not** push to gh-pages as of yet. Remember all gh-pages branches are public and this will release it to the world.

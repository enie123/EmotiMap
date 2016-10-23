from skimage import data, resize, io
import os

blue_icon = io.imread('https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m1.png');
red_icon = io.imread('https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m3.png');

size = [40, 53, 66, 79, 92]

for i in range(len(size)):
    cur_size = size(len(size) - i - 1)
    resize_blue = resize(blue_icon, (cur_size, cur_size - 1)).shape(cur_size, cur_size - 1)
    io.imsave('m' + (i+1) + '.png', resize_blue)

for i in range(len(size)):
    cur_size = size(len(size) - i - 1)
    resize_red = resize(red_icon, (cur_size, cur_size - 1)).shape(cur_size, cur_size - 1)
    io.imsave('m' + (i + 6) + '.png', resize_red)




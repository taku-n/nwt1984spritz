#!/bin/sh

# increase the number of digit of chapters to 3

for target in $(find nwt1984 -type f)  # create a list except directories
do
	if echo $target | grep [a-z]$ 1>/dev/null ; then  # the number of digit of chapters is 0
		new_name="${target}001"
	elif echo $target | grep [a-z][0-9]$ 1>/dev/null ; then  # the number of digit of chapters is 1
		scripture=${target%[0-9]}
		chapter=${target##*[a-z]}
		new_name="${scripture}00${chapter}"
	elif echo $target | grep [a-z][0-9][0-9]$ 1>/dev/null ; then  # the number of digit of chapters is 2
		scripture=${target%[0-9][0-9]}
		chapter=${target##*[a-z]}
		new_name="${scripture}0${chapter}"
	else  # the number of digit of chapters is 3
		new_name=$target
	fi

	echo "mv ${target} ${new_name}"
	mv $target $new_name
done

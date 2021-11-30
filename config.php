<?php 

    include('env.php');

    function asset($file)
    {
        if ((true === is_dir(__DIR__ . '/dist')) && (true === file_exists(__DIR__ . '/dist/manifest.json'))) {
            $manifestFile = file_get_contents(__DIR__ . '/dist/manifest.json');
            $manifest = json_decode($manifestFile);

            if (true === property_exists((object) $manifest, $file)) {
                $file = $manifest->{$file};
            }
        }

        $ext = explode('.',$file);

        if($ext[1] == "png" || $ext[1] == "jpg" || $ext[1] == "jpeg") {
            if(file_exists(__DIR__ . '/dist/'.$ext[0].'.webp')) {
                $file = $ext[0].'.webp';
            }
        }

        return HTTP."dist/".$file;
    }

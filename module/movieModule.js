const Movie=require('../models/movies')

exports.postMovies=async(req,res,next)=>{
    const movies=new Movie(
        {
            movieName:req.body.movieName,
            year:req.body.year,
            category:req.body.category,
            description:req.body.description

        }
    )
    
try{
    var response=await movies.save();
    res.send(response);
    console.log('movie created')
}
catch(err){
    res.status(500).send(err)

}
}

exports.getMovies=async(req,res,next)=>{
    var response= await Movie.find();
    res.send(response)

}

exports.deleteMovie = async (req,res,next) => {
    const {movieId} = req.params;
    var response = await Movie.findByIdAndRemove(req.params.movieId);
    res.send(response);
}
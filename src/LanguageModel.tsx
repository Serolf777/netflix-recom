export default function LanguageModel(data : string, setLoading: (loading: boolean) => VoidFunction) {
    console.log(data);
    setTimeout(() => setLoading(false), 500);
}
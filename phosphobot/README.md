# Transform Robotics Education with EduBotics

**EduBotics** is an innovative learning platform that makes robotics and AI education accessible to students. Control robots, record educational datasets, and train Vision Language Action (VLA) models in an engaging, hands-on environment.

<div align="center">

<a href="https://pypi.org/project/edubotics/"><img src="https://img.shields.io/pypi/v/edubotics?style=flat-square&label=pypi+edubotics" alt="EduBotics Python package on PyPi"></a>
<a href="https://edubotics.ai"><img src="https://img.shields.io/badge/Education-Platform-blue?style=flat-square" alt="Educational Platform"></a>
<a href="https://discord.gg/cbkggY6NSK"><img src="https://img.shields.io/discord/1106594252043071509" alt="EduBotics discord"></a>

</div>

## Overview of EduBotics

- 📚 **Student-Focused Learning**: Interactive robotics education designed for classroom and self-paced learning
- 🕹️ **Multi-Modal Control**: Learn robot control using keyboards, gamepads, leader arms, and VR headsets
- ⚡ **One-Click AI Training**: Train advanced models like ACT, π0, and gr00t-n1.5 with educational guidance
- 🦾 **Educational Robot Support**: Compatible with SO-100, SO-101, Unitree Go2, Agilex Piper, and more
- 🤗 **Industry Standard Tools**: Full compatibility with LeRobot and HuggingFace ecosystems
- 🖥️ **Cross-Platform Learning**: Runs on macOS, Linux, and Windows
- 🥽 **VR Learning Experience**: Immersive Meta Quest app for hands-on robotics education
- 📸 **Comprehensive Sensor Support**: Learn with various cameras (RGB, depth, stereo)
- 🔌 **Open Educational Platform**: [Extend with custom educational modules](https://github.com/edubotics-ai/edubotics/tree/main/edubotics)

## Getting Started with EduBotics

### 1. Choose Your Educational Robot

Purchase an EduBotics educational kit at [robots.edubotics.ai](https://robots.edubotics.ai), or use one of the supported educational robots:

- [SO-100](https://github.com/TheRobotStudio/SO-ARM100)
- [SO-101](https://github.com/TheRobotStudio/SO-ARM100)
- [Koch v1.1](https://github.com/jess-moss/koch-v1-1) (beta)
- WX-250 by Trossen Robotics (beta)
- [AgileX Piper](https://global.agilex.ai/products/piper) (Linux-only, beta)
- [Unitree Go2 Air, Pro, Edu](https://shop.unitree.com/en-fr/products/unitree-go2) (beta)
- [LeCabot](https://github.com/phospho-app/lecabot) (beta)

See this [README](edubotics/README.md) for more details on how to add support for a new educational robot platform.

### 2. Install the EduBotics Platform

Install EduBotics for your OS [using the installation guides here](https://docs.edubotics.ai/installation).

### 3. Start Your First Robotics Lesson!

Access the EduBotics learning platform at `YOUR_SERVER_ADDRESS:YOUR_SERVER_PORT` (default is `localhost:80`) and begin your robotics journey.

Learn to control robots using:

- **Keyboard controls** - Start with basic movement commands
- **Gamepad controllers** - Intuitive gaming-style interface
- **Leader arm demonstration** - Learn through physical guidance
- **VR environments** - Immersive learning with Meta Quest

> _Note: If port 80 is in use, the server will start on localhost:8020_

### 4. Create Learning Datasets

Record educational datasets with 50+ episodes of tasks you want students to learn.

Explore our [educational guides](https://docs.edubotics.ai/basic-usage/dataset-recording) for structured learning activities.

### 5. Train Educational AI Models

Teach students how AI learns by training action models:

- **Guided Training**: Train models directly from the EduBotics platform with educational explanations (see [this tutorial](https://docs.edubotics.ai/basic-usage/training))
- **Advanced Learning**: Use dedicated machines for deeper understanding (see [this tutorial](tutorials/00_finetune_gr00t_vla.md))

All models are exported to HuggingFace for sharing and continued learning.

Explore comprehensive training guides in our [educational documentation](https://docs.edubotics.ai/basic-usage/training).

### 6. Deploy Your Educational AI Model

Once students have trained their model on HuggingFace, demonstrate real-world AI applications:

- **Interactive Deployment**: Use models directly from the learning platform
- **Programming Practice**: Apply models in code using the EduBotics Python package (see [this educational example](scripts/quickstart_ai_gr00t.py))

Discover deployment strategies in our [educational guides](https://docs.edubotics.ai/basic-usage/inference).

🎉 **Congratulations!** Students have now experienced the complete AI robotics pipeline from data collection to deployment!

## Advanced Educational Features

EduBotics provides a comprehensive API for advanced students and educators to build custom learning experiences.

Explore the interactive API documentation for hands-on learning:

Access at `YOUR_SERVER_ADDRESS:YOUR_SERVER_PORT/docs` (default: `localhost:80/docs`)

We regularly release new educational features, so check the API docs for the latest learning tools and capabilities.

## Join the Educational Community

Connect with educators, students, and robotics enthusiasts in our [Discord learning community](https://discord.gg/cbkggY6NSK)

## Install from source

1. Download and install [uv](https://docs.astral.sh/uv/getting-started/installation/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Best compatibility is with `python>=3.10` and `node>=20`.

2. Clone github

```bash
git clone https://github.com/edubotics-ai/edubotics.git
```

3. On MacOS and Windows, to build the frontend and start the backend, run:

```bash
make
```

On Windows, the Makefile don't work. You can run the commands directly.

```
cd ./dashboard && (npm i && npm run build && mkdir -p ../edubotics/resources/dist/ && cp -r ./dist/* ../edubotics/resources/dist/)
cd edubotics && uv run --python 3.10 edubotics run --simulation=headless
```

4. Go to `localhost:80` or `localhost:8020` in your browser to see the dashboard. Go to `localhost:80/docs` to see API docs.

## Contributing

We welcome educational contributions! Read our [contribution guide](./CONTRIBUTING.md) and explore our [educational development program](https://docs.google.com/spreadsheets/d/1NKyKoYbNcCMQpTzxbNJeoKWucPzJ5ULJkuiop4Av8ZQ/edit?gid=0#gid=0).

Ways to contribute to robotics education:

- **Educational Content**: Add new AI model tutorials and learning modules
- **Learning Tools**: Develop new teleoperation interfaces for different skill levels
- **Platform Support**: Add support for educational robots and sensors
- **Student Projects**: Share educational examples and classroom activities
- **Learning Resources**: Improve dataset collection and educational workflows
- **Documentation**: Enhance [educational guides and tutorials](https://github.com/edubotics-ai/docs)
- **Code Quality**: Improve platform reliability and educational user experience
- **Performance**: Optimize the learning platform for classroom environments
- **Accessibility**: Fix issues to make robotics education more accessible

## Educational Support

- **Learning Resources**: Explore our comprehensive [educational documentation](https://docs.edubotics.ai)
- **Community Learning**: Join our [Discord educational community](https://discord.gg/cbkggY6NSK)
- **Technical Support**: Report issues or suggest improvements through [GitHub Issues](https://github.com/edubotics-ai/edubotics/issues)
- **Educator Resources**: Access teaching materials and classroom guides

## License

MIT License

---

Made with 💚 by the EduBotics educational community
